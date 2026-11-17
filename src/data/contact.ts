// Contatos do Bernardo, usados na página de contato.
export const CONTACT = {
  whatsapp: { display: "+55 (31) 99420-9220", number: "5531994209220" },
  email: "berdfandrade@gmail.com",
  instagram: "berd.rfa",
};

export const whatsappUrl = (text = "") =>
  `https://wa.me/${CONTACT.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const emailUrl = (subject = "", body = "") => {
  const query = new URLSearchParams({ ...(subject && { subject }), ...(body && { body }) }).toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT.email}${query ? `?${query}` : ""}`;
};
export const instagramUrl = `https://instagram.com/${CONTACT.instagram}`;
