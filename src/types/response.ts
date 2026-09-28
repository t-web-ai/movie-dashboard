export type ErrorResponse = {
  success: boolean;
  status: number;
  message: string;
  details: [
    {
      field: string;
      message: string;
    },
  ];
};

export type SuccessResponse = {
  success: boolean;
  message: string;
};
