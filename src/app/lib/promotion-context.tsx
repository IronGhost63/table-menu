import { createContext, useContext, ReactNode } from "react";
import { Promotion } from "./definitions";
import promotionItems from "../../data/promotion.json";

export const PromotionContext = createContext<Promotion[]>([]);

const PromotionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PromotionContext.Provider value={promotionItems}>
      {children}
    </PromotionContext.Provider>
  );
};

const usePromotion = () => {
  return useContext(PromotionContext);
};

export { PromotionProvider, usePromotion };
