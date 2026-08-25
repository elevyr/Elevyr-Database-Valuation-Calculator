import { LeadSourceType } from './types';

/**
 * Where the calculator's CTA sends people.
 *
 * TODO: replace with the real booking / discovery-call page
 * (Calendly, SavvyCal, HubSpot meetings, etc). This is the only place the
 * destination is defined in the React app — calculator_embed.html carries its
 * own copy of this constant, so change it in both.
 */
export const BOOKING_URL = 'https://example.com/REPLACE-WITH-BOOKING-URL';

export interface CtaContext {
  leads: number;
  commission: number;
  leadSource: LeadSourceType;
  recoverableDeals: number;
  pipelineValue: number;
}

/**
 * Carries the numbers the prospect just saw through to the booking page, so
 * the call opens with their figures instead of asking for them again.
 */
export const buildCtaUrl = (ctx: CtaContext): string => {
  const url = new URL(BOOKING_URL);
  url.searchParams.set('utm_source', 'database-valuation-calculator');
  url.searchParams.set('leads', String(ctx.leads));
  url.searchParams.set('commission', String(ctx.commission));
  url.searchParams.set('lead_source', ctx.leadSource);
  url.searchParams.set('est_deals', String(ctx.recoverableDeals));
  url.searchParams.set('est_value', String(ctx.pipelineValue));
  return url.toString();
};
