import { useEffect } from 'react';

// Type definitions for Mailchimp globals
declare global {
  interface Window {
    jQuery: any;
    fnames: string[];
    ftypes: string[];
  }
}

export const Newsletter: React.FC = ({ blok }: any) => {
  useEffect(() => {
    // Load Mailchimp validation script
    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    document.head.appendChild(script);

    // Initialize Mailchimp validation after script loads
    script.onload = (): void => {
      if (window.jQuery) {
        window.fnames = [];
        window.ftypes = [];
        window.fnames[0] = 'EMAIL';
        window.ftypes[0] = 'email';
        window.fnames[1] = 'FNAME';
        window.ftypes[1] = 'text';
        window.fnames[2] = 'LNAME';
        window.ftypes[2] = 'text';
        window.fnames[3] = 'ADDRESS';
        window.ftypes[3] = 'address';
        window.fnames[4] = 'PHONE';
        window.ftypes[4] = 'phone';
        window.fnames[5] = 'BIRTHDAY';
        window.ftypes[5] = 'birthday';
        window.fnames[6] = 'COMPANY';
        window.ftypes[6] = 'text';

      }
    };

    return (): void => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .newsletter-container {
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
          padding: 60px 40px;
          border-radius: 16px;
          text-align: center;
          max-width: 90%;
          margin: 0 auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .newsletter-title {
          font-size: 32px;
          font-weight: 600;
          color: #2e7d32;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        
        .newsletter-subtitle {
          font-size: 18px;
          color: #4a5568;
          margin-bottom: 40px;
          font-weight: 400;
        }
        
        .progress-container {
          position: relative;
          margin-bottom: 40px;
        }
        
        
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }
        
        .email-input {
          width: 100%;
          max-width: 400px;
          padding: 16px 20px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .email-input:focus {
          outline: none;
          border-color: #37474f;
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .subscribe-button {
          background: linear-gradient(135deg, #37474f 0%, #263238 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 160px;
        }
        
        .subscribe-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(55, 71, 79, 0.4);
        }
        
        .subscribe-button:active {
          transform: translateY(0);
        }
        
        .response {
          padding: 12px 20px;
          margin: 16px 0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        #mce-error-response {
          background: rgba(244, 67, 54, 0.1);
          border: 1px solid rgba(244, 67, 54, 0.3);
          color: #c62828;
        }
        
        #mce-success-response {
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid rgba(76, 175, 80, 0.3);
          color: #2e7d32;
        }
        
        @media (max-width: 768px) {
          .newsletter-container {
            padding: 40px 20px;
          }
          
          .newsletter-title {
            font-size: 24px;
          }
          
          .newsletter-subtitle {
            font-size: 16px;
          }
          
          .form-container {
            width: 100%;
          }
          
          .email-input {
            width: 100%;
            max-width: none;
          }
        }
      `}</style>

      <div className="newsletter-container">
        <h2 className="newsletter-title">
          {blok.title}
        </h2>

        <div id="mc_embed_signup">
          <form
            action="https://xvisionkliniken.us9.list-manage.com/subscribe/post?u=80d2e80252b00041402f3d399&id=84558e70c6&f_id=000a57e1f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div className="form-container">
              <input
                type="email"
                name="EMAIL"
                className="email-input required email"
                id="mce-EMAIL"
                placeholder="Din e-postadress"
                required
                defaultValue=""
              />

              <div id="mce-responses">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: 'none' }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: 'none' }}
                ></div>
              </div>

              {/* Honeypot field for spam protection */}
              <div
                style={{
                  position: 'absolute',
                  left: '-5000px'
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_80d2e80252b00041402f3d399_84558e70c6"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="subscribe-button"
              >
                Prenumerera
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
