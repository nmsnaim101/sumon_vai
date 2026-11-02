১. নতুন গুগল শিট বানান। প্রথম সারিতে লিখুন: সময় | ধরন | নাম | ফোন | ওয়ার্ড | বার্তা
২. শিটে Extensions > Apps Script খুলে Code.gs-এর কোড পেস্ট করে সেভ করুন।
৩. Deploy > New deployment > Web app। Execute as: Me। Who has access: Anyone। Deploy করে অনুমতি দিন।
৪. যে Web app URL পাবেন সেটি js/config.js-এর formUrl:'' এর ভেতরে বসান।
৫. পরে কোড বদলালে আবার Deploy > Manage deployments থেকে নতুন version দিতে হবে।

অ্যাডমিন প্যানেল (এজেন্ট পেজ > 🔐 অ্যাডমিন):
- পাসওয়ার্ড Code.gs-এর ADMIN_PW লাইনে আছে (এখন ডেমো)। বদলাতে ওই লাইন বদলে Deploy > Manage deployments > Edit > New version দিন।
- পাসওয়ার্ড সাইটের কোনো ফাইলে নেই, মেলানো হয় Apps Script-এ। ৫ বার ভুল দিলে ৫ মিনিট বন্ধ থাকে।
