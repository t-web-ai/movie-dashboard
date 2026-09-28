export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
};
