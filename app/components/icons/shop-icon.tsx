import { FC, SVGProps } from 'react'

type TProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>

export const ShopIcon: FC<TProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      {...props}
    >
      <path
        d="M17.5079 0.000970589C21.2078 0.00194118 24.9077 0.000970589 28.6086 0.00194118C28.7784 0.00194118 28.9483 0.00679412 29.1181 0.00582353C29.8723 0 30.4294 0.320294 30.7458 1.01135C31.2107 2.02562 31.6698 3.04183 32.1202 4.06289C32.9422 5.92642 33.6993 7.82198 34.5913 9.65251C35.4551 11.4267 34.8378 13.1389 33.3528 14.2725C31.2175 15.9021 28.1922 15.7362 26.2549 13.8571C26.0093 13.6183 25.8802 13.6047 25.625 13.8493C23.4945 15.9002 20.0994 15.908 17.9068 13.8649C17.6293 13.6067 17.4885 13.6164 17.2109 13.8678C14.8903 15.9681 11.6203 15.9012 9.36566 13.7144C9.16572 13.5203 9.07546 13.5756 8.90851 13.7397C6.80719 15.807 3.62851 15.9497 1.40877 14.0832C0.0674191 12.9554 -0.393611 11.2685 0.364419 9.77674C0.709949 9.09636 0.984626 8.38103 1.29133 7.68124C2.12992 5.77112 2.96657 3.861 3.80807 1.95282C3.95463 1.61991 4.11963 1.29574 4.2788 0.968648C4.60104 0.310588 5.13972 0.0087353 5.86184 0.00776471C6.75963 0.00388236 7.65646 0.000970589 8.55425 0C11.5388 0 14.5234 0 17.5079 0.000970589Z"
        fill="currentColor"
      />
      <path
        d="M17.5018 32.6629C11.8491 32.6629 6.19735 32.6629 0.54464 32.6629C0.00693416 32.6629 0.00596356 32.6619 0.00596356 32.1281C0.00596356 31.6185 0.0137283 31.109 0.00402238 30.5994C0.000140026 30.3645 0.0933165 30.2762 0.326258 30.2801C0.847464 30.2888 1.37061 30.2626 1.89085 30.2888C2.24123 30.3063 2.34411 30.1937 2.34314 29.8404C2.33149 25.8135 2.33635 21.7865 2.33635 17.7595C2.33635 17.1471 2.33538 17.151 2.92744 17.316C5.02488 17.9012 7.03303 17.6799 8.93732 16.6191C9.16347 16.4929 9.33332 16.4774 9.56918 16.6055C12.082 17.9721 14.6162 17.9827 17.1504 16.6715C17.4562 16.5133 17.6717 16.521 17.9784 16.6792C20.4873 17.9827 23.0021 17.9546 25.5004 16.6404C25.712 16.5288 25.877 16.491 26.1022 16.6162C28.0307 17.6896 30.0632 17.9022 32.1829 17.3043C32.6692 17.1675 32.6692 17.1636 32.6692 17.6848C32.6692 21.7244 32.6692 25.763 32.6692 29.8026C32.6692 30.2801 32.6702 30.2801 33.1496 30.2811C33.6592 30.282 34.1688 30.2888 34.6783 30.2791C34.9103 30.2753 35.0044 30.3626 35.0005 30.5975C34.9918 31.1798 34.9918 31.7622 35.0005 32.3436C35.0044 32.5785 34.9103 32.6775 34.6783 32.661C34.558 32.6522 34.4357 32.661 34.3143 32.661C28.7102 32.6629 23.106 32.6629 17.5018 32.6629ZM26.7942 25.1418C26.7942 23.5665 26.7952 21.9903 26.7932 20.415C26.7932 19.922 26.7214 19.8531 26.2206 19.8521C24.6696 19.8511 23.1176 19.8502 21.5666 19.8521C21.1085 19.8531 21.0231 19.9317 21.0231 20.3704C21.0212 23.5462 21.026 26.7219 21.0163 29.8977C21.0153 30.2034 21.1172 30.2898 21.4133 30.2879C23.0739 30.2762 24.7346 30.2743 26.3943 30.2888C26.7234 30.2918 26.802 30.1782 26.7991 29.8686C26.7864 28.2933 26.7942 26.7171 26.7942 25.1418ZM11.6754 25.6232C12.7178 25.6232 13.7592 25.6184 14.8016 25.6271C15.0414 25.629 15.152 25.566 15.151 25.301C15.1423 23.6413 15.1433 21.9806 15.1491 20.3209C15.1501 19.9773 14.9957 19.8472 14.6619 19.8482C12.6751 19.854 10.6873 19.8492 8.7005 19.8521C8.30256 19.8531 8.21229 19.9462 8.21132 20.351C8.20841 21.9864 8.21618 23.6228 8.20453 25.2583C8.20259 25.5543 8.30741 25.631 8.58597 25.6271C9.61576 25.6155 10.6456 25.6232 11.6754 25.6232Z"
        fill="currentColor"
      />
    </svg>
  )
}