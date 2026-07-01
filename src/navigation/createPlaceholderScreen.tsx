import type { ComponentType } from 'react';
import ModulePlaceholderScreen from '@/pages/common/ModulePlaceholderScreen';

export function createPlaceholderScreen(
  title: string,
  description: string,
): ComponentType {
  return function PlaceholderScreen() {
    return (
      <ModulePlaceholderScreen title={title} description={description} />
    );
  };
}
