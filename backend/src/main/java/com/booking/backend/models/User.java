package com.booking.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User implements Serializable, UserDetails {
  @Id
  private UUID id = UUID.randomUUID();
  private String name;

  @Column(unique = true)
  private String username;

  @Column(length = 255)
  private String email;

  @Column(length=60)
  private String password;

  private String phoneNumber;
  private String imgProfileUrl;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id", referencedColumnName = "id")
  private Role role;

  @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
  @JsonBackReference(value = "user-reviews")
  private List<Review> reviews;

  @Column(name = "last_password_reset_date")
  private Timestamp lastPasswordResetDate;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
          name = "service_favorite",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "service_id"))
  @JsonBackReference
  private List<Services> favoriteServices;

  public User(UUID id) {
    this.id = id;
  }

  private boolean isAccountNonExpired = true;
  private boolean isAccountNonLocked = true;
  private boolean isCredentialsNonExpired = true;
  private boolean isEnabled = true;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    Collection<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
   return authorities;
  }

  public String getRoles() {
    return role.getRoleName();
  }

  @Override
  public boolean isAccountNonExpired() {
    return this.isAccountNonExpired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return this.isAccountNonLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return this.isCredentialsNonExpired;
  }

  @Override
  public boolean isEnabled() {
    return this.isEnabled;
  }
}
