import { IOrder, IOrderSuccess, IProduct, IProductList, IStoreAPI } from '../types';
import { Api, ApiListResponse } from './base/api';

export class StoreAPI extends Api implements IStoreAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options)
    this.cdn = cdn;
  }

  getItemsList(): Promise<IProductList> {
    return this.get('/product/').then((data: ApiListResponse<IProduct>) => ({
      total: data.total,
      items: data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
      }))
    }))
  };

  getItem(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then(
        (item: IProduct) => ({...item, image: this.cdn + item.image })
    )
  };

  sendOrder(order: IOrder): Promise<IOrderSuccess>{
    return this.post('/order', order).then((data: IOrderSuccess) => data);
  }
}