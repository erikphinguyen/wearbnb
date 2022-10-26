const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Brand, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js')

// GET ALL BRANDS
router.get('/', asyncHandler(async function (req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
}))

// GET INDIVIDUAL BRAND
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {
    const { id } = req.params;
    const brand = await Brand.findByPk(Number(id))
    // this would not load the brand at all even with filled out info
    // {
    //     include: [{
    //         model: Review,
    //         where: {
    //             brandId: id
    //         }
    //     }]
    // })

    return res.json(brand)
}))

router.post('/search', asyncHandler(async function (req, res) {
    const {searchTerm} = req.body;
    console.log('WHAT IS SEARCH TERM', searchTerm)
    const brands = await Brand.findAll();
    let filtered = brands.filter(el => {
        return el.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    console.log('WHAT IS FILTERED', filtered)
    return res.json(filtered)
}))

// POST BRAND
router.post('/', requireAuth, asyncHandler(async function (req, res) {
    // const id = await Brand.create(req.body);

    let { brandImg, name, address, city, country } = req.body;

    let errorsArray = [];
    let brandImgSplit = brandImg.split('.')
    let brandExtensionFile = brandImgSplit[brandImgSplit.length - 1]
    let brandURL = brandImgSplit[0]

    if (brandImg.length === 0) {
        errorsArray.push("Please add a Brand Image")
    }
    if (brandImg.length > 255) {
        errorsArray.push("Brand Image length cannot exceed 255 characters")
    }
    if (!brandExtensionFile.includes('png') && !brandExtensionFile.includes('jpg') && !brandExtensionFile.includes('jpeg')) {
        errorsArray.push("Please use an image with extension file .png, .jpg, or .jpeg")
    }
    if (!brandURL.includes("http://") && !brandURL.includes("https://")) {
        errorsArray.push("Please use correct URL (http://) or (https://)")
    }
    if (name.length === 0) {
        errorsArray.push("Please add a name")
    }
    if (name.length > 255) {
        errorsArray.push("Name length cannot exceed 255 characters")
    }
    if (address.length === 0) {
        errorsArray.push("Please add an address")
    }
    if (address.length > 255) {
        errorsArray.push("Address length cannot exceed 255 characters")
    }
    if (city.length === 0) {
        errorsArray.push("Please add a city")
    }
    if (city.length > 255) {
        errorsArray.push("City length cannot exceed 255 characters")
    }
    if (country.length === 0) {
        errorsArray.push("Please add a country")
    }
    if (country.length > 255) {
        errorsArray.push("Country length cannot exceed 255 characters")
    }
    if (errorsArray.length) return res.status(400).json({ error: errorsArray })

    // let splitBrandImg = brandImg.split(".")
    // let splitBrandImgStr = String(splitBrandImg[splitBrandImg.length - 1])


    // if (splitBrandImgStr != jpg || splitBrandImgStr != png) {
    //     console.log('---------------------------------------WHAT IS SPLITBRANDIMG STRING', splitBrandImgStr)
    //     return res.status(400).json({ error: "This is not a .jpg or .png" })
    // }

    let newBrand = new Brand(req.body)

    await newBrand.save();

    let review = new Review({
        userId: req.body.userId,
        brandId: newBrand.id,
        review: ""
    })
    await review.save();
    const { fromModal } = req.body;
    return res.json(newBrand);
}))

// PUT BRAND
router.put('/:id', asyncHandler(async (req, res) => {
    const { brandImg, name, address, city, country } = req.body;
    let errorsArray = []
    let brandImgSplit = brandImg.split('.')
    let brandExtensionFile = brandImgSplit[brandImgSplit.length - 1]
    let brandURL = brandImgSplit[0]

    if (brandImg.length === 0) {
        errorsArray.push("There is an empty editted brand image")
    }
    if (brandImg.length > 255) {
        errorsArray.push("Brand Image length cannot exceed 255 characters")
    }
    if (!brandExtensionFile.includes('png') && !brandExtensionFile.includes('jpg') && !brandExtensionFile.includes('jpeg')) {
        errorsArray.push("Please use an image with extension file .png, .jpg, or .jpeg")
    }
    if (!brandURL.includes("http://") && !brandURL.includes("https://")) {
        errorsArray.push("Please use correct URL (http://) or (https://)")
    }
    if (name.length === 0) {
        errorsArray.push("There is an empty editted brand name")
    }
    if (name.length > 255) {
        errorsArray.push("Name length cannot exceed 255 characters")
    }
    if (address.length === 0) {
        errorsArray.push("There is an empty editted brand address")
    }
    if (address.length > 255) {
        errorsArray.push("Address length cannot exceed 255 characters")
    }
    if (city.length === 0) {
        errorsArray.push("There is an empty editted brand city")
    }
    if (city.length > 255) {
        errorsArray.push("City length cannot exceed 255 characters")
    }
    if (country.length === 0) {
        errorsArray.push("There is an empty editted brand country")
    }
    if (country.length > 255) {
        errorsArray.push("Country length cannot exceed 255 characters")
    }
    if (errorsArray.length) return res.status(400).json({ error: errorsArray })


    const id = parseInt(req.params.id);
    const brand = await Brand.findByPk(id);
    brand.brandImg = brandImg;
    brand.name = name;
    brand.address = address;
    brand.city = city;
    brand.country = country;
    await brand.save();



    return res.json(brand);
}))

// DELETE BRAND
router.delete('/:id(\\d+)', async (req, res) => {

    const { id } = req.params;

    const brands = await Brand.findByPk(id);
    await brands.destroy();
    return res.json({
        message: "brand deleted"
    })
})

module.exports = router;
