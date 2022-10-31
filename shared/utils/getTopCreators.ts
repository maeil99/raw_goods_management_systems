// eslint-disable-next-line import/no-unresolved
import { IFormattedGoods } from '../../types/goods.interface';

export interface ITopCreator {
  seller: string;
  sum: number;
}

export const getTopCreators = (goods: IFormattedGoods[]) => goods
  .reduce((creators, currentGoods) => {
    const index = (creators as ITopCreator[]).findIndex(
      (creator) => creator.seller === currentGoods.seller,
    );
    if (index > -1) {
      // eslint-disable-next-line no-param-reassign
      (creators as ITopCreator[])[index].sum += parseFloat(
        currentGoods.price,
      );
    } else {
      (creators as ITopCreator[]).push({
        seller: currentGoods.seller,
        sum: parseFloat(currentGoods.price),
      });
    }
    return creators;
  }, [])
  .sort((a, b) => (b as ITopCreator).sum - (a as ITopCreator).sum);
