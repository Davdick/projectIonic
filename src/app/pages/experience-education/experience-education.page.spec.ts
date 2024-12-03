// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ExperienceEducationPage } from './experience-education.page';

// describe('ExperienceEducationPage', () => {
//   let component: ExperienceEducationPage;
//   let fixture: ComponentFixture<ExperienceEducationPage>;

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ExperienceEducationPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceEducationPage } from './experience-education.page';
import { PostService } from 'src/app/post.service';
import { of } from 'rxjs';

describe('ExperienceEducationPage', () => {
  let component: ExperienceEducationPage;
  let fixture: ComponentFixture<ExperienceEducationPage>;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [ExperienceEducationPage],
      providers: [
        { provide: PostService, useValue: postServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceEducationPage);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on initialization', () => {
    const mockData = [{ id: 1, title: 'Test' }];
    postService.getData.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(postService.getData).toHaveBeenCalled();
    expect(component.data).toEqual(mockData);
    expect(component.loadCount).toBe(2);
  });

  it('should increment loadCount and call getVisibleDatas on loadData', () => {
    component.loadCount = 0;

    component.loadData({});

    expect(component.loadCount).toBe(2);
    // Puedes agregar más verificaciones si getVisibleDatas tiene lógica específica
  });

  it('should update visibleData correctly', () => {
    component.data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    component.loadCount = 2;

    component.getVisibleDatas();

    expect(component.visibleData.length).toBe(2);
    expect(component.visibleData).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should open link in new tab', () => {
    const url = 'http://example.com';
    spyOn(window, 'open'); // Espía la función open

    component.openLink(url);

    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});

