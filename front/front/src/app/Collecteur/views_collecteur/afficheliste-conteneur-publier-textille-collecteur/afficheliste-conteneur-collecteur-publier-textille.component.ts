import { Conteneur } from './../../../Usine/views_usine/models/conteneur';
/*import { DechetsService } from '../services/dechets.service';*/
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardModule,
  TableModule,
  GridModule,
  UtilitiesModule,
  ButtonDirective,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective,
  ButtonCloseDirective,
  ModalBodyComponent,
  TooltipDirective,
  ModalFooterComponent,
  ModalToggleDirective,
  PopoverDirective,
  WidgetStatAComponent,
  TemplateIdDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
} from '@coreui/angular';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetComponent } from '../../widget/widget.component';
/*import { ConteneurService } from '../services/conteneur.service';
import { Conteneur } from '../models/conteneur';
import { DepotService } from '../services/depot.service';*/
import { ModalService } from '../../../service/modal.service';
import { ConteneurService } from '../../services/conteneur.service';
import { DemandeService } from '../../../service/demande.service';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { UsersService } from 'src/app/service/users.service';
@Component({
  selector: 'app-afficheliste-conteneur-collecteur-publier-textille',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RowComponent,
    CommonModule,
    IconDirective,
    WidgetComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent,
    GridModule,
    CardModule,
    TableModule,
    GridModule,
    UtilitiesModule,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    NgTemplateOutlet,
    ModalToggleDirective,
    PopoverDirective,
    TooltipDirective,
    WidgetStatAComponent,
    TemplateIdDirective,
    RouterOutlet,
    WidgetComponent,
    IconDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './afficheliste-conteneur-collecteur-publier-textillle.html',
  styleUrl: './afficheliste-conteneur-collecteur-publier-textille.scss',
})
export class AffichelisteConteneurCollecteurPublierTextilleComponent implements OnInit {
  dechetType: string | null = null;
  conteneurs: any[] = []; // Initialisez comme tableau vide
  public liveDemoVisible = false;
  user: any;
  userId: any

  @ViewChild('customContent', { static: true })
  customContent!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private conteneurService: ConteneurService,
    private modalService: ModalService,
    private demandeService: DemandeService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.dechetType = this.route.snapshot.paramMap.get('key');
  
    console.log('UserID:', this.userId);
    console.log('DechetType:', this.dechetType);
  
    if (this.userId && this.dechetType) {
      this.usersService.getUserById(this.userId).subscribe(
        (res: any) => {
          console.log('User data:', res);
          this.user = res.userById;
          this.ConteneursLists();
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('UserID or DechetType is missing.');
    }
  }
  
  
  ConteneursLists() {
    if (this.dechetType && this.userId) {
      this.conteneurService.getPublishedConteneurByTypeAndUser(this.dechetType, this.userId).subscribe(
        (res: any) => {
          console.log('API Response:', res);
          this.conteneurs = res.published_containers.map((conteneur: any) => {
            // Retrieve stored isProcessing state from localStorage
            const isProcessing = localStorage.getItem(`conteneur_${conteneur.id}_isProcessing`) === 'true';
            return { ...conteneur, isProcessing: isProcessing };
          });
          console.log('Filtered Conteneurs:', this.conteneurs);
        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    } else {
      console.error('DechetType or UserID is missing');
    }
  }
  openDemandeModal(conteneur: any, conteneurID: number): void {
    this.modalService
      .openModal('Passer une demande', '', this.customContent)
      .then(() => {
        console.log(conteneurID);
        const currentDate = new Date();
        this.postDemande({ date: currentDate.toLocaleDateString() }, conteneurID);
      })
      .catch(() => console.log('Demande cancelled'));
  }

  postDemande(body: any, conteneurID: number): void {
    this.demandeService.postDemande(body, conteneurID).pipe(
      catchError((error) => {
        console.error('Une erreur s\'est produite', error);
        return throwError(error);
      })
    )
    .subscribe(
      (response) => {
        console.log('Post successful', response);
        window.location.reload();
      },
      (error) => {
        console.error('Post failed', error);
      }
    );


    if (conteneurID) {
      this.estdemandercollecteur(conteneurID);
    } else {
      console.error('Le conteneur est indéfini ou ne possède pas d\'id');
      return;
    }
  }

  
  estdemandercollecteur(conteneurID: number){
    this.conteneurService.estdemandercollecteur(conteneurID).subscribe({
      next: (response) => {
        console.log(' estdemandercollecteur créé avec succès:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création du   estdemandercollecteur:', error);
      }
    });
  }
  onDateChange(date: string) {
    console.log('Selected date:', date);
  }
}