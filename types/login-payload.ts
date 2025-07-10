interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: {
    code: string;
    number: string;
  };
  address: string;
}

export type { LoginPayload, RegisterPayload };
