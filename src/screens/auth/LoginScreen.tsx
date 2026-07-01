import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { envConfig } from '@/config/envConfig';
import { useAuth } from '@/contexts/AuthContextProvider';
import { LoginSchema } from '@/schemaTypes/loginSchemaTypes';
import { useTheme } from '@/providers/ThemeProvider';
import { radius, spacing, typography } from '@/theme/tokens';

export default function LoginScreen() {
  const { signIn, isLoading, error } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async () => {
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === 'email' || field === 'password') {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    try {
      await signIn({
        email: result.data.email,
        password: result.data.password,
      });
    } catch {
      // Error state is set in AuthContextProvider
    }
  };

  const submitButtonStyle = [
    styles.submitButton,
    {
      backgroundColor: colors.primary,
      opacity: isLoading ? 0.7 : 1,
    },
  ];

  const handlePress = () => {
    handleSubmit().catch(() => undefined);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.brandCard,
            { backgroundColor: colors.foreground },
          ]}
        >
          <Text style={[styles.brandTitle, { color: colors.background }]}>
            {envConfig.app.APP_NAME}
          </Text>
          <Text style={[styles.brandSubtitle, { color: colors.muted }]}>
            Link the future
          </Text>
        </View>

        <View
          style={[
            styles.formCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.foreground }]}>
            Welcome back
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Sign in to your account to continue
          </Text>

          {error ? (
            <Text style={[styles.errorBanner, { color: colors.destructive }]}>
              {error}
            </Text>
          ) : null}

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Email address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={colors.mutedForeground}
              editable={!isLoading}
              style={[
                styles.input,
                {
                  color: colors.foreground,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            />
            {fieldErrors.email ? (
              <Text style={[styles.fieldError, { color: colors.destructive }]}>
                {fieldErrors.email}
              </Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Password
            </Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                placeholder="Enter your password"
                placeholderTextColor={colors.mutedForeground}
                editable={!isLoading}
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    color: colors.foreground,
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                  },
                ]}
              />
              <Pressable
                onPress={() => setShowPassword(current => !current)}
                style={styles.showPasswordButton}
              >
                <Text style={{ color: colors.primary }}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
            {fieldErrors.password ? (
              <Text style={[styles.fieldError, { color: colors.destructive }]}>
                {fieldErrors.password}
              </Text>
            ) : null}
          </View>

          <Pressable
            onPress={handlePress}
            disabled={isLoading}
            style={submitButtonStyle}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.primaryForeground} />
            ) : (
              <Text
                style={[
                  styles.submitButtonText,
                  { color: colors.primaryForeground },
                ]}
              >
                Sign in
              </Text>
            )}
          </Pressable>
        </View>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>
          v{envConfig.appVersion}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  brandCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: typography.title,
    fontWeight: '700',
  },
  brandSubtitle: {
    fontSize: typography.subtitle,
    marginTop: spacing.xs,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.body,
    textAlign: 'center',
  },
  errorBanner: {
    fontSize: typography.caption,
    textAlign: 'center',
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
  },
  passwordRow: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 64,
  },
  showPasswordButton: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  fieldError: {
    fontSize: typography.caption,
  },
  submitButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
  },
  version: {
    textAlign: 'right',
    fontSize: typography.caption,
  },
});
