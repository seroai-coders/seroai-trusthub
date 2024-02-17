export const TabsEnum = {
  REVIEW_TICKETS: "REVIEW_TICKETS",
  CASES: "CASES",
};

export type TabsEnum = (typeof TabsEnum)[keyof typeof TabsEnum];
