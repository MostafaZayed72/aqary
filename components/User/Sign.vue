<template>
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  <div class="pa-4 text-center w-100" :style="$i18n.locale == 'ar-AR' ? 'direction:rtl' : ''">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          :text="$t('Login')"
          variant="tonal"
          v-bind="activatorProps"
          style="background-color: transparent"
        ></v-btn>
      </template>

      <!-- SIGN IN -->
      <v-card
        prepend-icon="mdi-account"
        :title="$t('Login')"
      >
        <v-text-field
          :label="$t('E-mail*')"
          required
        ></v-text-field>
        <v-text-field
          label="Password*"
          type="password"
          required
        ></v-text-field>
        <small 
          class="text-caption text-medium-emphasis mx-4 underline cursor-pointer hover:text-teal-400"
          @click="openForgotPasswordDialog"
        >{{ $t('Forget Password ?') }}</small>
        <h1 class="text-center my-2 font-bold text-xl">{{ $t('Or Sign Up') }}</h1>

        <!-- SIGN UP -->
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="userName"
                :label="$t('Username*')"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="mobile"
                hint="example of helper text only on focus"
                :label="$t('Mobile*')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6"></v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="email"
                :label="$t('Email*')"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="password"
                :label="$t('Password*')"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                v-model="confirmPassword"
                :label="$t('Confirm Password*')"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6"></v-col>

            <v-col cols="12" sm="6"></v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">{{ $t('*indicates required field') }}</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :text="$t('Close')"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            :text="$t('Confirm')"
            variant="tonal"
            @click="SignUp"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Forget Password Dialog -->
    <v-dialog
      v-model="forgotPasswordDialog"
      max-width="400"
    >
      <v-card
        prepend-icon="mdi-lock-reset"
        :title="$t('Reset Password')"
      >
        <v-card-text>
          <v-text-field
            :label="$t('Enter your email')"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :text="$t('Cancel')"
            variant="plain"
            @click="forgotPasswordDialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            :text="$t('Submit')"
            variant="tonal"
            @click="forgotPasswordDialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// تعريف المتغيرات
const dialog = ref(false);
const forgotPasswordDialog = ref(false);
const userName = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// تعريف الدوال
const openForgotPasswordDialog = () => {
  forgotPasswordDialog.value = true;
};

const SignUp = async () => {
  try {
    const response = await fetch('http://development.somee.com/api/User/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        Mobile: mobile.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    dialog.value = false;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};
</script>
