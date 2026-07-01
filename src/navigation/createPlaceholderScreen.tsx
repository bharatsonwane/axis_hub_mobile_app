import type { ComponentType } from 'react';
import ModulePlaceholderScreen from '@/screens/common/ModulePlaceholder';

export function createPlaceholderScreen(
  title: string,
  description: string,
): ComponentType {
  return function PlaceholderScreen() {
    return <ModulePlaceholderScreen title={title} description={description} />;
  };
}
