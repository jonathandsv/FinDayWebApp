import { Usuario } from "src/app/shared/models/user";

export interface LoginOutput {
  usuario?: Usuario,
  token?: string;
}
