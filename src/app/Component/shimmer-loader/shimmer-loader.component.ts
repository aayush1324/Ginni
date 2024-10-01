import { Component, Input, OnInit } from '@angular/core';
import { ShimmerService } from '../../Services/shimmer.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shimmer-loader',
  templateUrl: './shimmer-loader.component.html',
  styleUrl: './shimmer-loader.component.css',
  // animations: [
  //   trigger('shimmerAnimation', [
  //   transition('void => *', [
  //   style({ backgroundPosition: '-100% 0' }),
  //   animate('2s', style({ backgroundPosition: '100% 0' }))
  //   ])
  //   ])
  //   ]
})
export class ShimmerLoaderComponent implements OnInit {
  @Input() shimmerFor!: string;
 
 constructor(private shimmerService: ShimmerService) {}
 
 ngOnInit(): void {
  const animationId = this.shimmerService.generateShimmerAnimationId();
  this.startShimmerAnimation(animationId);
  }
 
 ngOnDestroy(): void {
  this.shimmerService.removeShimmerAnimation(this.shimmerFor);
  }
 
 startShimmerAnimation(animationId: string): void {
  // Implement shimmer animation logic here
  }
 }