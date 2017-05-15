import React, {PropTypes} from 'react';
import {Button, TextField, Spinner, Success, Alert} from 'coral-ui';
import styles from './styles.css';
import I18n from 'coral-i18n/modules/i18n/i18n';

const lang = new I18n();

const SignInContent = ({
  handleChange,
  handleChangeEmail,
  emailToBeResent,
  handleResendVerification,
  emailVerificationLoading,
  emailVerificationSuccess,
  formData,
  changeView,
  handleSignIn,
  auth,
  fetchSignInFacebook
}) => {

  return (
    <div className="coral-sign-in">
      <div className={`${styles.header} header`}>
        <h1>
          {auth.emailVerificationFailure ? lang.t('signIn.email_verify_cta') : lang.t('signIn.signIn')}
        </h1>
      </div>
      { auth.error && <Alert>{auth.error}</Alert> }
      {
        auth.emailVerificationFailure
        ? <form onSubmit={handleResendVerification}>
            <p>{lang.t('signIn.request_new_verify_email')}</p>
            <TextField
              id="confirm-email"
              type="email"
              label={lang.t('signIn.email')}
              value={emailToBeResent}
              onChange={handleChangeEmail} />
            <Button id='resendConfirmEmail' type='submit' cStyle='black' full>Send Email</Button>
            {emailVerificationLoading && <Spinner />}
            {emailVerificationSuccess && <Success />}
          </form>
        : <div>
            <div className={`${styles.socialConnections} social-connections`}>
              <Button cStyle="facebook" onClick={fetchSignInFacebook} full>
                {lang.t('signIn.facebook_sign_in')}
              </Button>
            </div>
            <div className={styles.separator}>
              <h1>
                {lang.t('signIn.or')}
              </h1>
            </div>
            <form onSubmit={handleSignIn}>
              <TextField
                id="email"
                type="email"
                label={lang.t('signIn.email')}
                value={formData.email}
                style={{fontSize: 16}}
                onChange={handleChange}
              />
              <TextField
                id="password"
                type="password"
                label={lang.t('signIn.password')}
                value={formData.password}
                style={{fontSize: 16}}
                onChange={handleChange}
              />
              <div className={styles.action}>
                {
                  !auth.isLoading ?
                  <Button id='coralLogInButton' type="submit" cStyle="black" className={styles.signInButton} full>
                    {lang.t('signIn.signIn')}
                  </Button>
                  :
                  <Spinner />
                }
              </div>
            </form>
          </div>
      }
      <div className={`${styles.footer} footer`}>
        <span><a onClick={() => changeView('FORGOT')}>{lang.t('signIn.forgot_your_pass')}</a></span>
        <span>
          {lang.t('signIn.need_an_account')}
          <a onClick={() => changeView('SIGNUP')} id='coralRegister'>
            {lang.t('signIn.register')}
          </a>
        </span>
      </div>
    </div>
  );
};

SignInContent.propTypes = {
  auth: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    emailVerificationFailure: PropTypes.bool
  }).isRequired,
  fetchSignInFacebook: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  emailVerificationLoading: PropTypes.bool.isRequired,
  emailVerificationSuccess: PropTypes.bool.isRequired,
  handleResendVerification: PropTypes.func.isRequired,
  handleChangeEmail: PropTypes.func.isRequired,
  emailToBeResent: PropTypes.string.isRequired
};

export default SignInContent;
