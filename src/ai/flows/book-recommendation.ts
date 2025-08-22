'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized book recommendations based on user search history.
 *
 * - getBookRecommendation - A function that takes user search history and returns a book recommendation.
 * - BookRecommendationInput - The input type for the getBookRecommendation function.
 * - BookRecommendationOutput - The return type for the getBookRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BookRecommendationInputSchema = z.object({
  searchHistory: z
    .string()
    .describe('The user search history, as a comma separated string.'),
});
export type BookRecommendationInput = z.infer<typeof BookRecommendationInputSchema>;

const BookRecommendationOutputSchema = z.object({
  bookRecommendation: z.string().describe('A personalized book recommendation based on the user search history.'),
});
export type BookRecommendationOutput = z.infer<typeof BookRecommendationOutputSchema>;

export async function getBookRecommendation(input: BookRecommendationInput): Promise<BookRecommendationOutput> {
  return bookRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bookRecommendationPrompt',
  input: {schema: BookRecommendationInputSchema},
  output: {schema: BookRecommendationOutputSchema},
  prompt: `You are a book recommendation expert. Based on the user's search history, you will provide a personalized book recommendation.  Be very brief.

Search History: {{{searchHistory}}}`,
});

const bookRecommendationFlow = ai.defineFlow(
  {
    name: 'bookRecommendationFlow',
    inputSchema: BookRecommendationInputSchema,
    outputSchema: BookRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
