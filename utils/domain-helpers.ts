import { IMonetaryAmount, IPropertySize } from "@/types/domain-type";

export const getPropertyPrimaryVariantData = (
  property: any,
  field: "price" | "paymentPlans" | "size" | "name"
) => {
  let variant = property?.ecommerceProduct?.productVariants?.filter(
    (variant: any) => variant.primaryProductVariant
  );

  if (!variant?.length) {
    variant = property?.ecommerceProduct?.productVariants?.[0];
  }

  switch (field) {
    case "price":
      return buildMonetaryAmount(
        Number(variant?.price),
        variant?.priceCurrency
      );
    case "paymentPlans":
      return variant?.paymentPlans;
    case "size":
      return buildPropertySize(variant?.size, variant?.sizeUnit);
    case "name":
      return variant?.name;
    default:
      return variant;
  }
};

// export const getPropertyFlatData = (property: any) => {
//   return {
//     id: property?.id,
//     name: property?.name,
//     assetTypeId: property?.assetTypeId,
//     locationId: property?.locationId,
//     description: property?.description,
//     address: property?.address,
//     features: property?.features,
//     coordinateX: '',
//     coordinateY: '',
//     assetSizeIds: [],
//     file: null,
//     files: null,
//     isActive: false,
//     forSale: false,
//     featuredAt: new Date().toISOString(),
//     landmarkId: '',
//     // Additional fields for the form UI
//     pricing: [
//       {
//         assetSizeId: '',
//         amount: {
//           amount: '',
//           currency: 'NGN',
//         },
//         noOfUnit: 1,
//         isPrimary: true,
//         paymentPlanId: '',
//       },
//     ],
//     landmarks: [],
//     images: [],
//   }
// };

export const convertAmountFromSubUnitToUnit = (amount: number) => {
  return amount ? amount / 100 : 0;
};

export const buildMonetaryAmount = (
  amount: number,
  currency: string
): IMonetaryAmount => {
  const amountFromSubUnit = convertAmountFromSubUnitToUnit(amount);
  return {
    amount: amount,
    currency: currency,
    userFriendlyAmount: amountFromSubUnit?.toString(),
    amountWithCurrency: currency !== undefined && amountFromSubUnit !== undefined
      ? amountFromSubUnit?.toLocaleString("en-US", {
          style: "currency",
          currency: currency,
        })
      : `${currency || ''}${amountFromSubUnit?.toString() || ''} `,
  };
};

export const buildPropertySize = (
  size: number,
  unit: string
): IPropertySize => {
  return {
    size: size,
    unit: unit,
    userFriendlySize: `${size?.toString() || ''}${unit?.toLowerCase() || ''}`,
  };
};
