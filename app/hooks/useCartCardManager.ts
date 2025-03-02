import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

import { Cart } from '~/types';

import useCurrentLanguage from './useCurrentLanguage';
import useHeaderFooterContext from './useHeaderFooterContext';

const useCartCardManager = ({ cart }: { cart: Cart }) => {
  const [quantity, setQuantity] = useState(Number(cart?.quantity ?? 1));
  const fetcher = useFetcher();
  const { setCarts, setCartCount } = useHeaderFooterContext();
  const { currentLanguage } = useCurrentLanguage();

  const fetcherQuantitySubmit = ({
    intent,
    quantity = 0
  }: {
    intent: 'dec' | 'inc';
    quantity?: number;
  }) => {
    fetcher.submit(
      { quantity, cartId: cart.id, intent },
      { method: 'POST', action: `/${currentLanguage}/load-carts` }
    );
  };

  const handleQuantityDec = () => {
    const newQuantity = quantity - 1;
    fetcherQuantitySubmit({ intent: 'dec', quantity: newQuantity });
    setQuantity(newQuantity);
  };

  const handleQuantityInc = () => {
    const newQuantity = quantity + 1;
    fetcherQuantitySubmit({ intent: 'inc', quantity: newQuantity });
    setQuantity(newQuantity);
  };

  const intent = fetcher?.formData?.get('intent');

  let disabledIncButton = false;
  let disabledDecButton = false;
  let disabledCancelButton = false;

  if (fetcher?.formData) {
    if (intent === 'inc') {
      disabledIncButton = true;
    }

    if (intent === 'dec') {
      disabledDecButton = true;
    }

    if (intent === 'cancel') {
      disabledCancelButton = true;
    }
  }

  // This is use to revert the quantity if any error occurs
  const cartQuantity = Number(cart?.quantity ?? 1);
  if (
    fetcher?.data?.error &&
    quantity !== cartQuantity &&
    (intent === 'inc' || intent === 'dec')
  ) {
    setQuantity(Number(cart?.quantity ?? 1));
  }

  const isCanceling = Boolean(
    fetcher.data?.success && fetcher?.formData?.get('intent') === 'cancel'
  );

  useEffect(() => {
    if (isCanceling) {
      setCarts(prev => prev.filter(p => p.id !== cart.id));
      setCartCount(prev => prev - 1);
    }
  }, [isCanceling]);

  return {
    fetcher,
    handleQuantityDec,
    handleQuantityInc,
    quantity,
    disabledIncButton,
    disabledDecButton,
    disabledCancelButton
  };
};

export default useCartCardManager;
