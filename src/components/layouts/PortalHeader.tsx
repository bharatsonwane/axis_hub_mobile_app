import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { DrawerHeaderProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MobileAuthRoute } from '@/navigation/routes/types';
import PortalSwitcher from '@/navigation/PortalSwitcher';
import { useTheme } from '@/providers/ThemeProvider';
import { spacing, typography } from '@/theme/tokens';

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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.sidebar,
          borderBottomColor: colors.border,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Text style={[styles.menuIcon, { color: colors.sidebarForeground }]}>
            ☰
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSwitcherOpen(true)}
          style={styles.titleBlock}
        >
          <Text
            style={[styles.title, { color: colors.sidebarForeground }]}
            numberOfLines={1}
          >
            Axishub
          </Text>
          <Text
            style={[styles.subtitle, { color: colors.mutedForeground }]}
            numberOfLines={1}
          >
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

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  menuButton: {
    padding: spacing.xs,
  },
  menuIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: typography.body,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: typography.caption,
  },
});
