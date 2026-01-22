import * as Yup from 'yup';

export const ratings = [
  { rating: 5, percent: 100 },
  { rating: 4, percent: 80 },
  { rating: 3, percent: 60 },
  { rating: 2, percent: 40 },
  { rating: 1, percent: 20 },
];

export const orderedTitles = [
  'Motorised blinds',
  'Blackout Roller Blinds',
  'Blackout Roman Blinds',
  'Vertical Blinds',
  'Motorised curtains',
  'Blackout Triple Pinch Pleat curtains',
  'Sheer Triple Pinch Pleat curtains',
  'Sheer Ripple Fold Curtains',
];

export const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required('First name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  whatsapp: Yup.string().nullable(),
  address: Yup.string().required('Address is required'),
  message: Yup.string()
    .max(250, 'Message must not exceed 250 characters')
    .required('Message is required'),
});

export const initialContactValues = {
  fullName: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  message: '',
};
