import axios, {AxiosInstance} from 'axios';
// @ts-ignore
import env from "@/util/env.ts";
import {LoginResponse} from "@/infra/integrations/login.ts";

class RemoteAccessClient {
  private static test = false;
  private static instance: AxiosInstance;
  private static abortController: AbortController;

  public static defineTest(): void {
    this.test = true;
  }

  public static getInstance(user: LoginResponse | undefined): AxiosInstance {
    if (this.test) {
      return axios.create();
    }
    if (!this.instance) {
      if(user){
        this.ReconfigureInstance(user.access)
      } else this.instance = this.configureInterceptors(this.configureInstance());
    }
    return this.instance;
  }
  public static getInstanceFormData(user: LoginResponse): AxiosInstance {
    return this.ReconfigureInstanceFormData(user.access)
  }

  public static cancelCall(): void {
    this.abortController.abort();
  }

  private static configureInstance(): AxiosInstance {
    this.abortController = new AbortController();
    return axios.create({
      baseURL: env.api_url,
      timeout: 0,
      headers: {'Content-Type': 'application/json'},
      signal: this.abortController.signal,
    });
  }

  static ReconfigureInstanceFormData(token: string): AxiosInstance {
    this.abortController = new AbortController();
    const instance = axios.create({
      baseURL: env.api_url,
      timeout: 0,
      headers: {
        "Content-Type": 'multipart/form-data',
        "Authorization": `Bearer ${token}`
      },
      signal: this.abortController.signal,
    });
    return this.configureInterceptors(instance)
  }

  static ReconfigureInstance(token: string): void {
    this.abortController = new AbortController();
    const instance = axios.create({
      baseURL: env.api_url,
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      signal: this.abortController.signal,
    });
    this.instance = this.configureInterceptors(instance)
  }

  // @ts-ignore
  private static configureInterceptors(instance): AxiosInstance {
    instance.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      function (response) {
        return response;
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      function (error) {
        return Promise.reject(error);
      },
    );
    return instance;
  }
}

export default RemoteAccessClient;
