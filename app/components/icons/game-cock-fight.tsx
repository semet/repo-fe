import { FC, SVGProps } from 'react'

type TProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>

export const GameCockFight: FC<TProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_5148_36309)">
        <path
          d="M28.7853 8.81998C30.4803 10.65 34.9953 15.345 30.7803 22.245C30.7803 22.245 29.5203 25.98 25.1103 28.455L24.3003 30.885L24.0753 34.98H23.2653V30.885L22.0953 29.625L21.7353 29.76L21.1503 31.11L20.9253 34.98H20.1153V30.84L19.0803 29.58L17.8203 28.995C17.8203 28.995 26.8653 28.575 26.5353 22.485C26.5053 21.885 26.4903 21.285 26.5353 20.685C26.5953 19.485 26.6253 17.52 26.3403 16.245C26.3103 16.125 26.4603 16.035 26.5653 16.11C26.9553 16.47 27.6453 17.355 28.0953 19.455C28.0953 19.455 28.6203 16.155 27.7803 13.59C27.7353 13.47 27.8853 13.365 27.9903 13.44C28.7253 14.01 30.3753 15.615 30.3453 18.405C30.3453 18.405 31.7853 15.39 28.5753 8.93998C28.5003 8.80498 28.6803 8.68498 28.7853 8.78998V8.81998Z"
          fill="currentColor"
        />
        <path
          d="M25.4999 15.8702C26.0999 19.0952 26.5799 27.2852 16.4699 27.9302C16.4699 27.9302 9.17991 27.8702 9.71991 20.2352C9.71991 20.2352 8.44491 20.0552 7.37991 21.0752C7.30491 21.1502 7.18491 21.1202 7.15491 21.0152C6.98991 20.3402 6.70491 18.3602 8.66991 17.9852C8.72991 17.9852 8.72991 17.8952 8.66991 17.8802L6.80991 17.5052C6.80991 17.5052 6.74991 17.4152 6.80991 17.4002L9.05991 16.6502C9.14991 16.6202 9.13491 16.4852 9.04491 16.4702C7.79991 16.2902 4.12491 15.4802 3.80991 12.0302C3.80991 11.9402 3.89991 11.8952 3.95991 11.9552C4.24491 12.2102 4.91991 12.6602 5.96991 12.7352C6.05991 12.7352 6.10491 12.6302 6.04491 12.5702L3.86991 10.6202C3.77991 10.5452 3.86991 10.3952 3.97491 10.4102L6.40491 10.9652C6.52491 10.9952 6.59991 10.8602 6.52491 10.7702C6.01491 10.2002 4.75491 8.89515 3.55491 8.43015C3.43491 8.38515 3.46491 8.22015 3.58491 8.20515L7.04991 7.80015C7.19991 7.78515 7.22991 7.59015 7.10991 7.51515C6.56991 7.17016 5.57991 6.43515 5.08491 5.34015C5.02491 5.22015 5.15991 5.08515 5.27991 5.14515C6.05991 5.50515 7.91991 6.31515 8.54991 6.28515C8.60991 6.28515 8.66991 6.24015 8.68491 6.18015C8.87991 5.62515 9.85491 2.40015 6.22491 0.270154C6.07491 0.180154 6.16491 -0.0448458 6.32991 -0.0148458C10.0199 0.645154 23.2799 4.00515 16.7549 17.1452C16.6049 17.4452 16.7399 17.8052 17.0549 17.9402C18.3449 18.4802 21.6299 19.3202 24.4949 15.6152C24.7949 15.2252 25.4249 15.3752 25.5149 15.8702H25.4999Z"
          fill="currentColor"
        />
        <path
          d="M30.2855 5.38478L30.1055 5.11478C30.0155 4.97978 29.9255 4.84478 29.8205 4.72478C29.6855 4.57478 29.5355 4.27478 30.0605 3.98978C30.0605 3.98978 31.0955 3.50978 29.7455 3.61478C29.5055 3.62978 29.2805 3.68978 29.0555 3.77978L28.3955 4.03478C28.2455 4.09478 28.0955 4.16978 27.9605 4.25978C27.5705 4.51478 26.7305 4.99478 26.9255 4.45478C26.9705 4.31978 27.0605 4.18478 27.1805 4.09478C27.4655 3.83978 28.0355 3.26978 27.0605 3.61478C26.0705 3.95978 25.6355 4.52978 25.5155 4.75478C25.4405 4.87478 25.3805 4.97978 25.2905 5.08478C25.0955 5.33978 24.7955 5.65478 24.7355 5.35478C24.7355 5.27978 24.7355 5.20478 24.7505 5.12978C24.8105 4.96478 24.9005 4.57478 24.4805 4.82978C24.2555 4.94978 24.0755 5.14478 23.9405 5.35478C23.6255 5.86478 23.0405 7.01978 23.1605 8.54978C23.1605 8.54978 22.3805 8.96978 22.2305 9.76478C22.2305 9.80978 22.2605 9.83978 22.3055 9.83978C22.6355 9.76478 23.8805 9.50978 24.5555 9.74978C24.5555 9.74978 22.2005 11.5198 23.5655 13.4098C24.9305 15.2998 26.3705 12.8098 26.1455 11.9548C26.1455 11.9548 25.5455 10.1398 26.7005 9.52478C27.3305 9.17978 27.8105 9.29978 28.0205 9.37478C28.0955 9.40478 28.1705 9.37478 28.1855 9.28478C28.2755 8.81978 28.3505 7.36478 25.5755 7.31978C25.5755 7.31978 25.6205 6.71978 27.6455 6.89978C27.6455 6.89978 31.2605 7.61978 30.2705 5.44478L30.2855 5.38478ZM25.6655 8.32478C25.6655 8.57978 25.4555 8.77478 25.2155 8.77478C24.9755 8.77478 24.7655 8.56478 24.7655 8.32478C24.7655 8.08478 24.9755 7.87478 25.2155 7.87478C25.4555 7.87478 25.6655 8.08478 25.6655 8.32478Z"
          fill="currentColor"
        />
        <path
          d="M13.0645 36.0002C13.0645 36.0002 21.0295 33.1202 30.3595 36.0002C30.3595 36.0002 20.6095 34.5602 13.0645 36.0002Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_5148_36309">
          <rect
            width="36"
            height="36"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
