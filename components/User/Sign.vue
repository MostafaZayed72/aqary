<template>
  <div class="pa-4 text-center w-100" :style="$i18n.locale == 'ar-AR' ? 'direction:rtl' : ''">
    <v-btn v-if="!isLoggedIn" class="text-none font-weight-regular" prepend-icon="mdi-account" :text="$t('Login')" variant="tonal"
      @click="dialog = true" style="background-color: transparent"></v-btn>
    <v-btn v-else class="text-none font-weight-regular" prepend-icon="mdi-account" :text="$t('Logout')" variant="tonal"
      @click="signOut()" style="background-color: transparent"></v-btn>

    <v-dialog v-model="dialog" max-width="600">
      <!-- SIGN IN -->
      <v-card prepend-icon="mdi-account" :title="$t('Login')">
        <v-text-field v-model="email" :label="$t('E-mail*')" required></v-text-field>
        <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
        <v-btn color="primary" class="w-fit mx-auto px-10 rounded" :text="$t('Confirm')" variant="tonal" @click="signIn"></v-btn>

        <small class="text-caption mt-2 text-medium-emphasis mx-4 underline cursor-pointer hover:text-teal-400"
          @click="openForgotPasswordDialog">{{ $t('Forget Password ?') }}</small>

        <h1 class="text-center my-2 font-bold text-xl">{{ $t('Or Sign Up') }}</h1>

        <!-- SIGN UP -->
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="userName" :label="$t('Username*')" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="mobile" hint="example of helper text only on focus"
                :label="$t('Mobile*')"></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6"></v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="signupEmail" :label="$t('Email*')" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="signupPassword" :label="$t('Password*')" type="password" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field v-model="confirmPassword" :label="$t('Confirm Password*')" type="password"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6"></v-col>

            <v-col cols="12" sm="6"></v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">{{ $t('*indicates required field') }}</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('Close')" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" :text="$t('Confirm')" variant="tonal" @click="signUp"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Forget Password Dialog -->
    <v-dialog v-model="forgotPasswordDialog" max-width="400">
      <v-card prepend-icon="mdi-lock-reset" :title="$t('Reset Password')">
        <v-card-text>
          <v-text-field :label="$t('Enter your email')" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('Cancel')" variant="plain" @click="forgotPasswordDialog = false"></v-btn>

          <v-btn color="primary" :text="$t('Submit')" variant="tonal" @click="forgotPasswordDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Response Dialog -->
    <v-dialog v-model="responseDialog" max-width="400">
      <v-card>
        <v-card-text>
          <p>{{ $t(responseMessage) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :text="$t('Close')" @click="responseDialog = false" class="text-center mx-auto"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// State variables
const dialog = ref(false);
const forgotPasswordDialog = ref(false);
const responseDialog = ref(false);
const responseMessage = ref('');
const userName = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const isLoggedIn = ref(false); // Placeholder for login status

// Functions
const openForgotPasswordDialog = () => {
  forgotPasswordDialog.value = true;
};

const signUp = async () => {
  try {
    const response = await fetch('http://development.somee.com/api/User/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName.value,
        Mobile: mobile.value,
        email: signupEmail.value,
        password: signupPassword.value,
        confirmPassword: confirmPassword.value,
      })
    });

    if (response.ok) {
      responseMessage.value = 'User successfully created and Verification Mail has been sent to the user';
    } else {
      const errorMessage = await response.json();
      responseMessage.value = errorMessage.errors.Email[0] + ' / ' + errorMessage.errors.Email[1] + ' / ' + errorMessage.errors.Mobile[0] + ' / ' + errorMessage.errors.Mobile[1] +' / '+ errorMessage.errors.Password[0] +' / '+ errorMessage.errors.Password[1];
    }

    dialog.value = false;
    responseDialog.value = true;
  } catch (error) {
    responseMessage.value = error.message;
    responseDialog.value = true;
  }
};

const signIn = async () => {
  try {
    const response = await fetch('http://development.somee.com/api/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      })
    });

    if (response.ok) {
      // Handle successful sign in
      responseMessage.value = 'User successfully signed in';

      // Save email to localStorage
      localStorage.setItem('email', email.value);

      // Set login status
      isLoggedIn.value = true;

      // Optionally, navigate to another page using Vue Router
      // const router = useRouter();
      // router.push('/profile'); // Example navigation
    } else {
      // Handle sign in errors
      const errorMessage = await response.json();
      responseMessage.value = errorMessage.message; // Adjust based on actual response structure
    }

    dialog.value = false;
    if (!isLoggedIn.value) {
      responseDialog.value = true;
    }
  } catch (error) {
    responseMessage.value = error.message;
    responseDialog.value = true;
  }
};

const signOut = () => {
  // Clear localStorage
  localStorage.removeItem('email');

  // Reset login status
  isLoggedIn.value = false;

  navigateTo('/')
};

// Uncomment this if you want to retrieve email from localStorage on component mount
// import { onMounted } from 'vue';
// onMounted(() => {
//   const savedEmail = localStorage.getItem('email');
//   if (savedEmail) {
//     email.value = savedEmail;
//   }
// });

</script>
