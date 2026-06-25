# Login Test Plan

## Application Overview

Login test plan for CURA Healthcare demo app (katalon-demo-cura.herokuapp.com). Covers core happy paths and negative/error cases for the login flow. Assumes a fresh browser state for each test and availability of test credentials. Includes concrete step-by-step instructions, expected outcomes, and clear success/failure criteria so any tester can run them reliably.

## Test Scenarios

### 1. Login Flow

**Seed:** `tests/functional/login.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/plans/login/successful-login.spec.md`

**Steps:**
  1. Open the application URL: https://katalon-demo-cura.herokuapp.com/
    - expect: Page title is 'CURA Healthcare Service'
    - expect: Header (//h1) shows 'CURA Healthcare Service'
  2. Click 'Make Appointment' link
    - expect: Login prompt text 'Please login to make' is visible
  3. Fill 'Username' with 'John Doe' and 'Password' with 'ThisIsNotAPassword'
    - expect: Fields accept input
  4. Click the 'Login' button
    - expect: Page navigates to Make Appointment page
    - expect: Element 'h2' contains text 'Make Appointment'

#### 1.2. Prevent login with incorrect credentials

**File:** `tests/plans/login/invalid-creds.spec.md`

**Steps:**
  1. Open the application and click 'Make Appointment'
    - expect: Login prompt is visible
  2. Fill 'Username' with 'John Smith' and 'Password' with 'ThisIsNotAPassword'
    - expect: Fields accept input
  3. Click the 'Login' button
    - expect: Locator '#login' contains text 'Login failed! Please ensure the username and password are valid.'

#### 1.3. Missing password validation

**File:** `tests/plans/login/missing-password.spec.md`

**Steps:**
  1. Open login flow (Make Appointment)
    - expect: Login prompt visible
  2. Fill 'Username' with 'John Doe' and leave 'Password' empty
    - expect: Password field is empty
  3. Click 'Login'
    - expect: Application shows validation or same login page remains with an error message (e.g., '#login' contains relevant message)

#### 1.4. Missing username validation

**File:** `tests/plans/login/missing-username.spec.md`

**Steps:**
  1. Open login flow
    - expect: Login prompt visible
  2. Leave 'Username' empty and fill 'Password' with 'ThisIsNotAPassword'
    - expect: Username field is empty
  3. Click 'Login'
    - expect: Application shows validation or an error message and does not log the user in

#### 1.5. Invalid username format (email-like field negative case)

**File:** `tests/plans/login/invalid-username-format.spec.md`

**Steps:**
  1. Open login flow
    - expect: Login prompt visible
  2. Fill 'Username' with a malformed value (e.g., 'not-an-email@@') and password with any text
    - expect: Fields accept input
  3. Click 'Login'
    - expect: Application does not log in the user and shows an error or validation message

#### 1.6. SQL injection attempt (negative security test)

**File:** `tests/plans/login/sql-injection.spec.md`

**Steps:**
  1. Open login flow
    - expect: Login prompt visible
  2. Fill 'Username' with "' OR '1'='1" and 'Password' with "' OR '1'='1"
    - expect: Fields accept input
  3. Click 'Login'
    - expect: Application does not grant access; any error or refusal to authenticate is acceptable

#### 1.7. Multiple failed attempts lead to lockout or rate limiting

**File:** `tests/plans/login/failed-attempts-lockout.spec.md`

**Steps:**
  1. Open login flow
    - expect: Login prompt visible
  2. Attempt login with invalid credentials 5 times in a row (record timestamps)
    - expect: Each attempt shows a failure message per attempt
  3. On the 5th+ attempt, observe whether application blocks further attempts or shows a 'too many attempts' message
    - expect: Either explicit lockout message appears or subsequent attempts are blocked for a measurable period
