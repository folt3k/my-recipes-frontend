import http from "../../common/api/http";

export const login = (body: {
  login: string;
  password: string;
}): Promise<{ token: string }> =>
  http.post("auth/login", body).then(res => res.data);
