const express = require("express");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middlewares/auth");
const CouponCode = require("../models/couponCode");
const router = express.Router();

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.find({
        name: req.body.name,
      });
      if (isCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Nem megfelelő kuponkód", 400));
      }
      const couponCode = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);
      if (!couponCode) {
        return next(new ErrorHandler("Nincs ilyen kuponkód", 400));
      }
      res.status(201).json({
        success: true,
        message: "Sikeres törlés",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });
      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
