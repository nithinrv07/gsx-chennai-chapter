/**
 * GSX Chennai email service.
 * Sends website form submissions to reachtogsxchennai@gmail.com through Web3Forms.
 * A copy is also kept in the visitor's browser (localStorage) as a backup, but a submission
 * only counts as delivered when Web3Forms confirms it.
 */

export const GSX_OFFICIAL_EMAIL = 'reachtogsxchennai@gmail.com';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
/**
 * Web3Forms access key for reachtogsxchennai@gmail.com. Web3Forms keys are designed to be
 * public (they only allow sending to the registered inbox), so it is safe in client code.
 */
export const WEB3FORMS_ACCESS_KEY = 'bdc79651-99bf-475f-babc-3c24be8a7a66';

export interface SendResult {
  success: boolean;
  message?: string;
}

export interface JoinCommunityPayload {
  name: string;
  email: string;
  phone: string;
  collegeOrOrg: string;
  primaryInterest: string;
  socialHandle?: string;
}

export interface ProjectSubmissionPayload {
  title: string;
  category: string;
  shortDescription: string;
  techStack: string;
  creatorName: string;
  creatorEmail: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface EventRegistrationPayload {
  eventName: string;
  name: string;
  email: string;
  phone?: string;
  organization: string;
  experienceLevel: string;
  interests: string;
  ticketId: string;
}

const submittedAt = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

function backup(key: string, data: object) {
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // Storage may be unavailable (private mode); the email is what matters.
  }
}

/**
 * Send fields to the GSX inbox via Web3Forms. `replyTo` lets the team answer the sender
 * straight from Gmail. Resolves with success only when Web3Forms accepts the submission.
 */
export async function sendToGsxEmail(
  subject: string,
  fields: Record<string, string>,
  replyTo?: string
): Promise<SendResult> {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error('Web3Forms access key is not set in src/lib/emailService.ts');
    return { success: false, message: 'Form email is not configured' };
  }
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: 'GSX Chennai Website',
        ...(replyTo ? { replyto: replyTo } : {}),
        ...fields,
        'Submitted At': submittedAt(),
      }),
    });
    const result = await response.json().catch(() => ({} as { success?: boolean; message?: string }));
    const accepted = response.ok && result?.success === true;
    if (!accepted) console.warn('Web3Forms rejected the submission:', result?.message || response.status);
    return { success: accepted, message: result?.message };
  } catch (err) {
    console.warn('Form email could not be sent:', err);
    return { success: false, message: 'Network error' };
  }
}

/** Join GSX Chennai member registration. */
export async function sendJoinRegistration(data: JoinCommunityPayload): Promise<SendResult> {
  backup('gsx_member_registrations', data);
  return sendToGsxEmail(
    `New GSX Member Registration: ${data.name}`,
    {
      'Form Type': 'Join GSX Chennai Chapter',
      'Full Name': data.name,
      'Email Address': data.email,
      'Contact / WhatsApp Number': data.phone,
      'College or Organization': data.collegeOrOrg,
      'Primary Interest': data.primaryInterest,
      'Social Handle': data.socialHandle || 'None provided',
    },
    data.email
  );
}

/** Project showcase submission. */
export async function sendProjectSubmission(data: ProjectSubmissionPayload): Promise<SendResult> {
  backup('gsx_project_submissions', data);
  return sendToGsxEmail(
    `New Project Showcase Submission: ${data.title} (${data.creatorName})`,
    {
      'Form Type': 'Project Showcase Submission',
      'Project Title': data.title,
      'Category': data.category,
      'Short Description': data.shortDescription,
      'Tech Stack': data.techStack,
      'Creator Name': data.creatorName,
      'Creator Email': data.creatorEmail,
      'Live Demo URL': data.liveDemoUrl || 'Not provided',
      'Project / Code Repository': data.githubUrl || 'Not provided',
    },
    data.creatorEmail
  );
}

/** Event registration. */
export async function sendEventRegistration(data: EventRegistrationPayload): Promise<SendResult> {
  backup('gsx_event_registrations', data);
  return sendToGsxEmail(
    `New Event Pass [${data.ticketId}]: ${data.name} - ${data.eventName}`,
    {
      'Form Type': 'Event Registration',
      'Ticket ID': data.ticketId,
      'Event': data.eventName,
      'Attendee Name': data.name,
      'Attendee Email': data.email,
      'Phone': data.phone || 'Not provided',
      'College / Org': data.organization,
      'Experience Level': data.experienceLevel,
      'Interests': data.interests,
    },
    data.email
  );
}
