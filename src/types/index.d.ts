import type { JSX } from "astro/jsx-runtime"
export type Faq = {
  title: string;
  content: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type typeItemNavigation = {
    id: number
    name: string|JSX.Element
    className?: string
    href?: string|undefined
    action?: any
}