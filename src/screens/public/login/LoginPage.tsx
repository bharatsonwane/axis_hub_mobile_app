import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { envConfig } from '@/config/envConfig';
import { useAuth } from '@/contexts/AuthContextProvider';
import { LoginSchema } from '@/schemaTypes/loginSchemaTypes';
import { createLoginPageStyles } from '@/screens/public/login/loginPage.styles';
import { useTheme } from '@/providers/ThemeProvider';
import { showSuccessToast } from '@/utils/toast';

export default function LoginScreen() {
  const { signIn, isLoading, error } = useAuth();
  const { colors } = useTheme();
  const { styles, placeholderTextColor, activityIndicatorColor } =
    createLoginPageStyles({ colors, isLoading });
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
      showSuccessToast('Sign in successful');
    } catch {
      // Error state is set in AuthContextProvider
    }
  };

  const handlePress = () => {
    handleSubmit().catch(() => undefined);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.brandCard}>
          <Text style={styles.brandTitle}>{envConfig.app.APP_NAME}</Text>
          <Text style={styles.brandSubtitle}>Link the future</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to your account to continue
          </Text>

          {error ? <Text style={styles.errorBanner}>{error}</Text> : null}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={placeholderTextColor}
              editable={!isLoading}
              style={styles.input}
            />
            {fieldErrors.email ? (
              <Text style={styles.fieldError}>{fieldErrors.email}</Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                placeholder="Enter your password"
                placeholderTextColor={placeholderTextColor}
                editable={!isLoading}
                style={styles.passwordField}
              />
              <Pressable
                onPress={() => setShowPassword(current => !current)}
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            </View>
            {fieldErrors.password ? (
              <Text style={styles.fieldError}>{fieldErrors.password}</Text>
            ) : null}
          </View>

          <Pressable
            onPress={handlePress}
            disabled={isLoading}
            style={styles.submitButton}
          >
            {isLoading ? (
              <ActivityIndicator color={activityIndicatorColor} />
            ) : (
              <Text style={styles.submitButtonText}>Sign in</Text>
            )}
          </Pressable>
        </View>

        <Text style={styles.version}>v{envConfig.appVersion}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
