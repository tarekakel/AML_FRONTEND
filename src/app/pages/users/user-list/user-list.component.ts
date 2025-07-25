import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../../services/user/user.service';
// import { ApiResponse } from '../../../models/shared';

@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UsersComponent {
  res: any;
  isEditing = false;
  editingUserId: number | null = null;
  userForm: FormGroup;
  searchTerm = '';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;
  isLoading = false;

  showModal = false;
  selectedUser: User | null = null;
  // private userService: UserService, 
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {

    //   this.loadUsers();
  }

  // loadUsers() {
  //   this.isLoading = true;

  //   this.userService
  //     .getUsers(this.page, this.pageSize, this.searchTerm)
  //     .subscribe((res) => {

  //       this.res = res;
  //       this.totalCount = res.page_count;
  //       this.totalPages = res.total_pages;
  //       this.isLoading = false;
  //     });
  // }

  onSearchChange() {
    this.page = 1;
    //   this.loadUsers();
  }

  goToPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
    //  this.loadUsers();
  }

  startEdit(user: User) {
    this.isEditing = true;
    this.editingUserId = user.id;
    this.userForm.patchValue({
      name: user.username,
      email: user.email,
      role: user.role,
    });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset();
  }

  saveUser(user: User) {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;
    this.showModal = false;
    if (this.isEditing && this.editingUserId !== null) {
      //   this.userService.updateUser({ id: this.editingUserId, ...userData });
    } else {
      //    this.userService.addUser(userData);
    }

    this.cancelEdit();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      //    this.userService.deleteUser(id);
    }
  }


  openModal(user: User | null) {
    this.selectedUser = user;
    this.showModal = true;
  }


  // Function to get form control easily in template or TS
  getControl(controlName: string) {
    return this.userForm.get(controlName);
  }
}
