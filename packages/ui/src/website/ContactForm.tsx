import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

import { cn } from '../lib/utils';

export interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IContactFormProps {
  onSubmit?: (data: IFormData) => void | Promise<void>;
  className?: string;
}

export const ContactForm: React.FC<IContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFormSubmit = (e: React.FormEvent): void => {
    void handleSubmit(e);
  };

  return (
    <form onSubmit={onFormSubmit} className={cn('space-y-6', className)}>
      {/* Name and Email Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--default-color)' }}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
            style={{
              borderColor: 'var(--border-color)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-color)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-color)33';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            placeholder="John Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--default-color)' }}
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
            style={{
              borderColor: 'var(--border-color)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-color)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-color)33';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--default-color)' }}
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
          style={{
            borderColor: 'var(--border)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-color)';
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-color)33';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          placeholder="How can we help you?"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold mb-2"
          style={{ color: 'var(--default-color)' }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none"
          style={{
            borderColor: 'var(--border)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-color)';
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-color)33';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          placeholder="Your message here..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300',
            isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'shadow-lg hover:shadow-xl hover:-translate-y-1',
          )}
          style={{
            backgroundColor: isSubmitting ? 'var(--accent-color)' : 'var(--accent-color)',
            color: 'var(--contrast-color)',
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#d14801';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-color)';
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Your message has been sent successfully!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          There was an error sending your message. Please try again.
        </div>
      )}
    </form>
  );
};
