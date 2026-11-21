"use strict";

const publicationList = document.querySelector("#publication-list");
const statusMessage = document.querySelector("#publication-status");
const filters = document.querySelector("#publication-filters");
const search = document.querySelector("#publication-search");
const type = document.querySelector("#publication-type");

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function publicationLink(label, className, href, title) {
  const link = element("a", className, label);
  link.href = href;
  link.setAttribute("aria-label", `${label} · ${title}`);
  return link;
}

function publicationEntry(paper) {
  const entry = element("li", "publication");
  const description = element("div");
  description.append(element("span", "publication-type", paper.type));
  description.append(element("h4", "", paper.title));

  if (Array.isArray(paper.authors) && paper.authors.length) {
    const authors = element("p", "publication-authors");
    paper.authors.forEach((author, index) => {
      if (index > 0) authors.append(", ");
      authors.append(author === "Gerardo Iuliano" ? element("strong", "", author) : author);
    });
    description.append(authors);
  }

  const details = element("p", "publication-details");
  if (paper.venue) details.append(element("span", "publication-venue", paper.venue));
  for (const value of [paper.track, paper.rank, paper.location]) {
    if (value) details.append(details.hasChildNodes() ? ` · ${value}` : value);
  }
  if (details.hasChildNodes()) description.append(details);
  entry.append(description);

  const links = element("div", "publication-links");
  if (typeof paper.reference === "string" && /^https:\/\//i.test(paper.reference)) {
    links.append(publicationLink("Reference", "small-link", paper.reference, paper.title));
  }
  if (typeof paper.paper === "string" && /^[^/\\]+\.pdf$/i.test(paper.paper)) {
    const href = `assets/publications/${encodeURIComponent(paper.paper)}`;
    links.append(publicationLink("PDF", "small-link pdf-link", href, paper.title));
  }
  if (links.hasChildNodes()) entry.append(links);
  return entry;
}

function renderPublications(publications) {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matching = publications.filter(paper => {
    const searchable = [paper.title, paper.authors, paper.year, paper.type, paper.venue,
      paper.rank, paper.track, paper.location].join(" ").toLowerCase();
    return (!type.value || paper.type === type.value) && terms.every(term => searchable.includes(term));
  });

  const content = document.createDocumentFragment();
  let currentYear;
  let entries;
  for (const paper of matching) {
    if (paper.year !== currentYear) {
      currentYear = paper.year;
      const group = element("div", "publication-year");
      entries = element("ul", "publication-entries");
      group.append(element("h3", "year-label", String(currentYear)), entries);
      content.append(group);
    }
    entries.append(publicationEntry(paper));
  }
  publicationList.replaceChildren(content);

  if (!matching.length) {
    statusMessage.textContent = publications.length ? "No publications match your search." : "No publications yet.";
  } else {
    const label = matching.length === 1 ? "publication" : "publications";
    statusMessage.textContent = `${matching.length} ${label}`;
  }
}

async function loadPublications() {
  statusMessage.textContent = "Loading publications…";
  try {
    const response = await fetch("publications.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || !data.every(paper => paper &&
      typeof paper.title === "string" && paper.title.trim() &&
      typeof paper.type === "string" && paper.type.trim() && Number.isInteger(paper.year))) {
      throw new Error("Invalid publication data");
    }

    const publications = data.sort((first, second) => second.year - first.year);
    const types = [...new Set(publications.map(paper => paper.type))].sort();
    for (const name of types) type.add(new Option(name, name));

    const render = () => renderPublications(publications);
    render();
    filters.hidden = publications.length === 0;
    search.addEventListener("input", render);
    type.addEventListener("change", render);
    filters.addEventListener("submit", event => event.preventDefault());
  } catch (error) {
    statusMessage.textContent = "Publications could not be loaded. ";
    statusMessage.append(publicationLink("Publication data", "", "publications.json", "JSON"));
    console.error("Unable to load publications", error);
  }
}

loadPublications();
