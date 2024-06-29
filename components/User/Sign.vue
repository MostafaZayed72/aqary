<template>
  <div class="pa-4 text-center w-100" :style="$i18n.locale == 'ar-AR' ? 'direction:rtl' : ''">
    <v-btn v-if="myEmail == ''" class="text-none font-weight-regular" prepend-icon="mdi-account" :text="$t('Login')" variant="tonal"
      @click="dialog = true" style="background-color: transparent"></v-btn>
    <v-btn v-else class="text-none font-weight-regular" prepend-icon="mdi-account" :text="$t('Logout')" variant="tonal"
      @click="signOut" style="background-color: transparent"></v-btn>

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
          <v-text-field v-model="forgotPasswordEmail" :label="$t('Enter your email')" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('Cancel')" variant="plain" @click="forgotPasswordDialog = false"></v-btn>

          <v-btn color="primary" :text="$t('Submit')" variant="tonal" @click="forgotPassword"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Password Reset Dialog -->
    <v-dialog v-model="passwordResetDialog" max-width="400">
      <v-card prepend-icon="mdi-lock-reset" :title="$t('Reset Password')">
        <v-card-text>
          <v-text-field v-model="resetCode" :label="$t('Enter Reset Code')" required></v-text-field>
          <v-text-field v-model="newPassword" :label="$t('New Password')" type="password" required></v-text-field>
          <v-text-field v-model="confirmNewPassword" :label="$t('Confirm New Password')" type="password" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn :text="$t('Cancel')" variant="plain" @click="passwordResetDialog = false"></v-btn>

          <v-btn color="primary" :text="$t('Submit')" variant="tonal" @click="submitPasswordReset()"></v-btn>
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
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const myEmail = ref('')
onMounted(() => {
    myEmail.value = localStorage.getItem('email') || '';
});

// State variables
const dialog = ref(false);
const forgotPasswordDialog = ref(false);
const passwordResetDialog = ref(false);
const responseDialog = ref(false);
const responseMessage = ref('');
const userName = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const forgotPasswordEmail = ref('');
const resetCode = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Functions
const openForgotPasswordDialog = () => {
  forgotPasswordDialog.value = true;
};

const forgotPassword = async () => {
  try {
    const response = await fetch(`https://development.somee.com/api/User/forgot-password?email=${forgotPasswordEmail.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      responseMessage.value = 'Password reset instructions sent to your email.';
      passwordResetDialog.value = true; // Open password reset dialog after successful email submission
    } else {
      const errorMessage = await response.json();
      responseMessage.value = errorMessage.msg; // Adjust based on actual response structure
    }

    responseDialog.value = true;
  } catch (error) {
    responseMessage.value = error.message;
    responseDialog.value = true;
  }
};

const submitPasswordReset = async () => {
  try {
    const response = await fetch('http://development.somee.com/api/User/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: resetCode.value,
        Password: newPassword.value,
        ConfirmPassword: confirmNewPassword.value,
      })
    });

    if (response.ok) {
      const responseData = await response.json();
      responseMessage.value = responseData.msg;
      passwordResetDialog.value = false; // Close dialog on success
    } else {
      const errorData = await response.json();
      const errors = errorData.errors;
      responseMessage.value = '';

      for (const field in errors) {
        errors[field].forEach((error) => {
          responseMessage.value += `${error}\n`;
        });
      }
    }

    responseDialog.value = true;
  } catch (error) {
    responseMessage.value = error.message;
    responseDialog.value = true;
  }
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
      dialog.value = false; // Close dialog on success
    } else {
      const errorMessage = await response.json();
      
      
      
   
      if(errorMessage.errors.ConfirmPassword )
      {
        
        responseMessage.value = errorMessage.errors.ConfirmPassword[0] 
      }
      if(errorMessage.errors.Password )
      {
        
        responseMessage.value = errorMessage.errors.Password[0] 
      }

      if(errorMessage.errors.Email )
      {
        
        responseMessage.value = errorMessage.errors.Email[0] 
      }

      if(errorMessage.errors.Mobile )
      {
        
        responseMessage.value = errorMessage.errors.Mobile[0] 
      }

      if(errorMessage.errors.UserName )
      {
        
        responseMessage.value = errorMessage.errors.UserName[0] 
      }
      
    }

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
      const responseData = await response.json();
      myEmail.value = responseData.email;
      localStorage.setItem('email', email.value);
      localStorage.setItem('token', responseData.token); // حفظ التوكن في localStorage
      dialog.value = false; // إغلاق النافذة على النجاح
      location.reload(); // إعادة تحميل الصفحة
    } else {
      const errorData = await response.json();
      responseMessage.value = errorData.msg;
      responseDialog.value = true;
    }
  } catch (error) {
    responseMessage.value = error.message;
    responseDialog.value = true;
  }
};

const signOut = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('token'); // حذف التوكن من localStorage
  myEmail.value = '';
  location.reload(); // إعادة تحميل الصفحة
};
</script>
