import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { DrawerHeaderProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createPortalHeaderStyles } from '@/components/layouts/portalHeader.styles';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import PortalSwitcher from '@/navigation/PortalSwitcher';
import { useTheme } from '@/providers/ThemeProvider';

type PortalHeaderProps = DrawerHeaderProps & {
  portalRoute: MobileAuthRoute;
};

export default function PortalHeader({
  navigation,
  options,
  portalRoute,
}: PortalHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const title = options.title ?? portalRoute.title;
  const styles = createPortalHeaderStyles({
    colors,
    paddingTop: insets.top,
  });
  const showBack = navigation.canGoBack();

  const handleLeadingPress = () => {
    if (showBack) {
      navigation.goBack();
      return;
    }
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          onPress={handleLeadingPress}
          style={styles.menuButton}
          accessibilityRole="button"
          accessibilityLabel={showBack ? 'Go back' : 'Open menu'}
        >
          <Text style={showBack ? styles.backIcon : styles.menuIcon}>
            {showBack ? '‹' : '☰'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSwitcherOpen(true)}
          style={styles.titleBlock}
        >
          <Text style={styles.title} numberOfLines={1}>
            Axishub
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {title} · {portalRoute.title}
          </Text>
        </Pressable>
      </View>

      <PortalSwitcher
        visible={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
      />
    </View>
  );
}
