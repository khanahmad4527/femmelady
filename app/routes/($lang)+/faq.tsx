import { Accordion, Button, Grid, Stack, Text } from '@mantine/core';
import { useOutletContext } from 'react-router';
import useTranslation from '~/hooks/useTranslation';
import { OutletContext } from '~/types';

const faq = [
  {
    title: 'Delivery and Order Tracking',
    faq: [
      {
        question: 'How long does delivery take?',
        answer:
          "Delivery times vary depending on your location. Orders are typically delivered within 3-7 business days. You can track your order status in the 'My Orders' section of your account."
      },
      {
        question: 'How can I track my order?',
        answer:
          "Once your order is shipped, you will receive a tracking link via email or SMS. Alternatively, you can log in to your account and check the 'Track Order' section."
      },
      {
        question: 'What should I do if my order hasn’t arrived?',
        answer:
          "If your order hasn’t arrived within the estimated delivery time, please <a href='/contact'>contact our support team</a> with your order ID. We’ll investigate the issue and provide updates promptly."
      }
    ]
  },
  {
    title: 'Returns and Exchange',
    faq: [
      {
        question: 'What is your return policy?',
        answer:
          "You can return unused items within 30 days of delivery. Items must be in their original packaging with tags attached. For more details, visit our <a href='/return-policy'>Return Policy page</a>."
      },
      {
        question: 'How do I exchange an item?',
        answer:
          'To exchange an item, please initiate a return for the unwanted item and place a new order for the desired item. Contact our support team for assistance with size or product issues.'
      },
      {
        question: 'Are sale items eligible for return?',
        answer:
          'Yes, sale items are eligible for return unless explicitly stated otherwise on the product page. Check the product details or contact us for clarification.'
      }
    ]
  },
  {
    title: 'Refunds',
    faq: [
      {
        question: 'How long does it take to receive a refund?',
        answer:
          'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be issued to your original payment method.'
      },
      {
        question: 'Can I get a refund for shipping charges?',
        answer:
          'Shipping charges are non-refundable unless the return is due to an error on our part (e.g., wrong or defective item shipped).'
      },
      {
        question: 'Why haven’t I received my refund yet?',
        answer:
          'If you haven’t received your refund after the processing time, check with your bank or payment provider. If the issue persists, contact our support team with your refund reference number.'
      }
    ]
  },
  {
    title: 'Payment and Promotions',
    faq: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept a wide range of payment methods, including credit/debit cards, PayPal, and other regional payment options. Check the checkout page for available options in your region.'
      },
      {
        question: 'How do I apply a promo code?',
        answer:
          "Enter your promo code in the 'Discount Code' field during checkout and click 'Apply.' The discount will be reflected in your order total."
      },
      {
        question: 'Why isn’t my promo code working?',
        answer:
          'Ensure that the promo code is entered correctly and that it hasn’t expired. Promo codes may also have restrictions. For further assistance, contact our support team.'
      }
    ]
  },
  {
    title: 'Information on Sizes and Products',
    faq: [
      {
        question: 'How can I find the right size?',
        answer:
          "Each product page includes a size guide to help you find the perfect fit. If you're unsure, contact our support team for advice."
      },
      {
        question: 'Are the product colors accurate?',
        answer:
          'We strive to display colors as accurately as possible. However, slight variations may occur due to screen settings.'
      },
      {
        question: 'What materials are used in your products?',
        answer:
          'Our product pages include detailed information about the materials used. For further questions, please contact our support team.'
      }
    ]
  },
  {
    title: 'Personal Data and Notifications',
    faq: [
      {
        question: 'How is my personal data used?',
        answer:
          "We use your personal data to process orders, improve our services, and send notifications. For more details, read our <a href='/privacy-policy'>Privacy Policy</a>."
      },
      {
        question: 'How do I subscribe or unsubscribe from notifications?',
        answer:
          "You can manage your notification preferences in the 'Account Settings' section of your profile."
      },
      {
        question: 'How do I delete my account?',
        answer:
          'If you wish to delete your account, please contact our support team. Note that this action is irreversible.'
      }
    ]
  }
];

const Faq = () => {
  const t = useTranslation();
  const { searchParams, setSearchParams } = useOutletContext<OutletContext>();

  const currentIndex = Number(searchParams.get('faq') ?? 1) - 1;

  const currentFaq = faq.at(currentIndex) || faq[0];

  const faqAccordionTitle = currentFaq.title;
  const faqAccordionFaq = currentFaq.faq;

  const items = faqAccordionFaq.map(item => (
    <Accordion.Item key={item.question} value={item.question}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>
        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Text fw={500} mb={{ base: 'md', md: 'xl' }} fz={'xl'}>
          {t('common.categories')}
        </Text>
        <Stack>
          {faq.map((f, i) => (
            <Button
              color={currentIndex === i ? 'black' : ''}
              onClick={() => {
                const params = new URLSearchParams();
                params.set('faq', String(++i));
                setSearchParams(params, {
                  preventScrollReset: true
                });
              }}
            >
              {f.title}
            </Button>
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Text fw={500} mb={{ base: 'md', md: 'xl' }} fz={'xl'}>
          {faqAccordionTitle}
        </Text>
        <Accordion>{items}</Accordion>
      </Grid.Col>
    </Grid>
  );
};

export default Faq;
