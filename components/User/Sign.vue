<template>
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

      <!-- SIGN UP -->
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

        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                :label="$t('First name*')"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                hint="example of helper text only on focus"
                :label="$t('Mobile*')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6"></v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                :label="$t('Email*')"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
                :label="$t('Password*')"
                type="password"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" sm="6">
              <v-text-field
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
            @click="dialog = false"
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

<script>
export default {
  data: () => ({
    dialog: false,
    forgotPasswordDialog: false
  }),
  methods: {
    openForgotPasswordDialog() {
      this.forgotPasswordDialog = true;
    }
  }
}
</script>
