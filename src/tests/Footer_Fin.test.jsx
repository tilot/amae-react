import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Pour les matchers comme toBeInTheDocument()
import { describe, test, expect } from '@jest/globals';
import Footer_Fin from "../components/Footer/Footer_Fin";
import { MemoryRouter } from "react-router-dom";

describe("Footer_Fin component", () => {
  test("renders all footer links and icons correctly", () => {
    render(
      <MemoryRouter>
        <Footer_Fin />
      </MemoryRouter>
    );

    // Vérifie la présence des icônes par leur alt
    expect(screen.getByAltText("Calendrier")).toBeInTheDocument();
    expect(screen.getByAltText("Activité")).toBeInTheDocument();
    expect(screen.getAllByAltText("Recettes")).toHaveLength(2); // Recettes et Bons plans

    // Vérifie les liens associés
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/calendrier");
    expect(links[1]).toHaveAttribute("href", "/activites");
    expect(links[2]).toHaveAttribute("href", "/recettes");
    expect(links[3]).toHaveAttribute("href", "/smart_Deal");


  });
});
