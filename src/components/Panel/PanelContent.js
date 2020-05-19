import React from 'react';

import {Accordion} from 'react-bootstrap';
import AdministrationCard from "./Cards/AdministrationCard";
import CompetitionCard from "./Cards/CompetitionCard";
import FinanceCard from "./Cards/FinanceCard";
import HistorianCard from "./Cards/HistorianCard";
import InformationTechnologyCard from "./Cards/InformationTechnologyCard";
import OperationsCard from "./Cards/OperationsCard";
import PersonnelCard from "./Cards/PersonnelCard";
import PublicAffairsCard from "./Cards/PublicAffairsCard";
import ReportsCard from "./Cards/ReportsCard";
import ResourcesCard from "./Cards/ResourcesCard";

function PanelContent(props) {
  return (
      <Accordion>
        <AdministrationCard {...props} />
        <CompetitionCard {...props} />
        <FinanceCard {...props} />
        <HistorianCard {...props} />
        <InformationTechnologyCard {...props} />
        <OperationsCard {...props} />
        <PersonnelCard {...props} />
        <PublicAffairsCard {...props} />
        <ReportsCard {...props} />
        <ResourcesCard {...props} />
      </Accordion>
  );
}

export default PanelContent;