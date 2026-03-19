import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('career').title('Careers'),
      S.documentTypeListItem('testimonial').title('Testimonials'),

      // Grouping Legal Pages
      S.listItem()
        .title('Legal Pages')
        .child(
          S.list()
            .title('Legal Pages')
            .items([
              S.listItem()
                .title('Privacy Policy')
                .child(
                  S.document()
                    .schemaType('legal')
                    .documentId('privacyPolicy')
                ),
              S.listItem()
                .title('Terms & Conditions')
                .child(
                  S.document()
                    .schemaType('legal')
                    .documentId('termsConditions')
                ),
              S.listItem()
                .title('Refunds & Cancellations')
                .child(
                  S.document()
                    .schemaType('legal')
                    .documentId('refundsCancellations')
                ),
              S.listItem()
                .title('Disclaimer')
                .child(
                  S.document()
                    .schemaType('legal')
                    .documentId('disclaimer')
                ),
            ])
        ),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['blogPost', 'career', 'testimonial', 'legal'].includes(item.getId()!),
      ),
    ])
