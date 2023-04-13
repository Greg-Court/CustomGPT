declare module '@heroicons/react' {
  import { SVGAttributes } from 'react';

  export type Icon = (props: SVGAttributes<SVGElement>) => JSX.Element;

  export * from '@heroicons/react/outline';
  export * from '@heroicons/react/solid';
}