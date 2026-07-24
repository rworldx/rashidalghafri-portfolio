import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TextReveal } from '@/components/motion/TextReveal';

describe('TextReveal', () => {
  it('renders English name with spaces between words', () => {
    const { container } = render(
      <TextReveal text="Rashid Al Ghafri" emphasis="Al Ghafri" />,
    );
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim()).toBe('Rashid Al Ghafri');
  });

  it('renders Arabic name with spaces between words', () => {
    const { container } = render(<TextReveal text="راشد الغافري" />);
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.trim()).toBe('راشد الغافري');
  });
});
