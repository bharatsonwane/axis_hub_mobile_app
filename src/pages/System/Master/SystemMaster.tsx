import React from 'react';
import { Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '@/components/layouts/ScreenContainer';
import { createSystemListScreenStyles } from '@/pages/System/shared/listScreen.styles';
import { useTheme } from '@/providers/ThemeProvider';

export default function SystemMaster() {
  const { colors } = useTheme();
  const styles = createSystemListScreenStyles({ colors });
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer>
      <Text style={styles.heading}>System Master</Text>
      <Text style={styles.subheading}>
        View system users and roles. Editing remains on web.
      </Text>

      <Pressable
        style={styles.hubCard}
        onPress={() => navigation.navigate('SystemUsers')}
      >
        <Text style={styles.hubTitle}>System users</Text>
        <Text style={styles.hubDescription}>
          Browse platform admin and system user accounts.
        </Text>
      </Pressable>

      <Pressable
        style={styles.hubCard}
        onPress={() => navigation.navigate('SystemRoles')}
      >
        <Text style={styles.hubTitle}>System roles</Text>
        <Text style={styles.hubDescription}>
          Browse system roles and permission assignments.
        </Text>
      </Pressable>
    </ScreenContainer>
  );
}
