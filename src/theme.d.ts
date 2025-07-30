/**
 * Type definitions for Docusaurus theme components
 *
 * This file provides TypeScript types for theme components used in the project
 * to prevent TypeScript errors when importing and using them.
 */

declare module '@theme/Heading' {
  import type { ReactNode } from 'react';

  export interface HeadingProps {
    /**
     * Heading level to render (h1, h2, h3, etc.)
     */
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    /**
     * Content of the heading
     */
    children: ReactNode;

    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Any additional props will be spread to the underlying element
     */
    [prop: string]: any;
  }

  /**
   * A component to render heading elements with appropriate styling
   */
  export default function Heading(props: HeadingProps): JSX.Element;
}

// Add more theme component type definitions as needed
