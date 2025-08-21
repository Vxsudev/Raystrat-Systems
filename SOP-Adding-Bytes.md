# SOP: How to Add a New "Byte" to the Website

**Objective:** To provide a clear, step-by-step process for adding a new "Byte" (a short article) to the Raystrat Systems website, designed for team members with no prior coding experience.

**Frequency:** Perform this procedure whenever a new Byte is ready for publication.

---

### **Step 1: Locate the Content File**

All the text content for the website is stored in a central location to make updates easy. You only need to edit one file.

1.  In the file explorer on the left side of your screen, navigate to the following file:
    `src/data/content.ts`

    *You can think of the `src` folder as the "source" of the website, and `data` as the place where we keep text and other information.*

---

### **Step 2: Find the `bytes` List**

Inside the `content.ts` file, scroll down until you find a section that starts with `export const bytes = [`. This is a list that holds all the content for each Byte on the website.

It will look like this:

```javascript
export const bytes = [
  {
    slug: 'byte-01-the-real-cost-of-manual-follow-up',
    title: 'The Real Cost of Manual Follow-Up',
    summary: 'Every hour spent chasing an invoice is an hour not spent on billable work. We quantify the hidden operational drag of manual accounts receivable and show how automation reclaims that value.',
    content: 'The content for Byte-01 goes here.',
  },
  {
    slug: 'byte-02-repurposing-content-isnt-optional',
    title: 'Repurposing Content Isn’t Optional, It’s Asymmetric ROI',
    // ... more content ...
  },
  // ... more bytes might be here
];
```

---

### **Step 3: Copy and Paste the Template**

To add a new Byte, you will copy an existing one to use as a template.

1.  Carefully select the entire block of text for the **last** Byte in the list. Start with the opening `{` and end with the closing `},`.
2.  Copy this block.
3.  Place your cursor after the closing `},` of the last Byte and press Enter to create a new line.
4.  Paste the block you just copied.

**IMPORTANT:** Make sure you add a comma `,` after the block you just pasted if there are more blocks after it. The very last item in the list should **not** have a comma after it.

**Example: Adding a Third Byte**

*Before:*
```javascript
export const bytes = [
  { /* ... content for Byte-01 ... */ },
  { /* ... content for Byte-02 ... */ }
];
```

*After pasting:*
```javascript
export const bytes = [
  { /* ... content for Byte-01 ... */ },
  { /* ... content for Byte-02 ... */ },  // <-- Added a comma here!
  { /* ... pasted copy of Byte-02 ... */ } // <-- This is the new one
];
```

---

### **Step 4: Edit the Content**

Now, simply replace the placeholder text in the new block you just pasted.

-   **`slug`**: This is the URL for the new Byte. It must be **unique** and follow these rules:
    -   Use all lowercase letters.
    -   Use dashes `-` instead of spaces.
    -   Keep it short and descriptive.
    -   **Best Practice:** Start it with `byte-XX-` where `XX` is the new number (e.g., `byte-05-`).

-   **`title`**: This is the main headline of your Byte.

-   **`summary`**: This is the short, 2-3 sentence description that appears on the main Bytes page card.

-   **`content`**: This is the full text that will appear on the Byte's dedicated page. For now, you can put placeholder text here.

**Example of a filled-out new Byte:**

```javascript
{
  slug: 'byte-04-why-your-best-leads-are-boring',
  title: 'Why Your Best Leads Are “Boring”',
  summary: 'High-excitement leads often churn. The most profitable clients come from methodical, intent-driven prospecting. We’ll show you how to find them.',
  content: 'The content for Byte-04 goes here.',
}
```

---

### **Step 5: Save Your Changes**

Once you have filled in the details for your new Byte, save the file. The website will automatically update to include the new Byte on the page. The system handles the numbering ("Byte-01", "Byte-02") automatically based on the order in the list.

You have successfully added a new Byte.
