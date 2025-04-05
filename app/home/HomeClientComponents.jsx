'use client';

import { Suspense } from 'react';
import Button from '../components/Button';
import ContactForm from './ContactForm';

// Client component for the subscription button
export function SubscriptionButton() {
  return (
    <Button 
      buttonText="Subscribe" 
      bgcolor={"#fff2d4"} 
      textColor={"black"} 
      onClick={() => {}} 
    />
  );
}

// Client component for the contact form section
export function ContactFormSection() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <div id="contactAnchor">
        <ContactForm />
      </div>
    </Suspense>
  );
}

// Client component for the latest issue button
export function LatestIssueButton({ latestJournalUrl, latestJournalDetails }) {
  return (
    <div>
      <a href={latestJournalUrl}>
        <Button
          textColor={"white"}
          buttonText={"Volume " + latestJournalDetails.volume + " Issue " + latestJournalDetails.issue + "  " + latestJournalDetails._id}
          bgcolor={"#3a54b4"}
        />
      </a>
    </div>
  );
} 